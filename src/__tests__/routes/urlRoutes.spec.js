import {afterEach, beforeEach, expect, jest, test} from '@jest/globals'

await jest.unstable_mockModule('../../controller/urlController.js', () => {
    const createUrlStorageMock = jest.fn()
    const getUrlStorageMock = jest.fn()

    return {
        default: jest.fn().mockImplementation(() => ({
            createUrlStorage: createUrlStorageMock,
            getUrlStorage: getUrlStorageMock,
        })),
        __mocks: {
            createUrlStorageMock,
            getUrlStorageMock,
        }
    }
})

await jest.unstable_mockModule('../../service/writeUrl.js', () => ({
    default: jest.fn()
}))

await jest.unstable_mockModule('../../service/readUrl.js', () => ({
    default: jest.fn()
}))

await jest.unstable_mockModule('../../model/urlStorage.js', () => ({
    default: jest.fn()
}))

const { setupUrlRoutes, router } = await import('../../routes/urlRoutes.js')
const UrlStorageController = (await import('../../controller/urlController.js')).default
const {
    __mocks: { createUrlStorageMock, getUrlStorageMock },
} = await import('../../controller/urlController.js')

describe("Url Routes Setup", () => {
    let mongooseMock

    beforeEach(() => {
        mongooseMock = {
            Schema: jest.fn(),
            model: jest.fn(),
        };
    })

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("Should configure routes correctly", async () => {
        await setupUrlRoutes(mongooseMock)

        const postRoute = router.stack.find(layer => layer.route.path === '/url' && layer.route.methods.post)
        const getRoute = router.stack.find(layer => layer.route.path === '/:indexUrl' && layer.route.methods.get)
        
        expect(postRoute).toBeDefined()
        expect(getRoute).toBeDefined()
    })

    test("Should call the right controller on POST route", async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockNext = jest.fn()

        await setupUrlRoutes(mongooseMock)

        const postRouteHandler = router.stack.find(layer => layer.route?.path === '/url' && layer.route.methods.post).route.stack[0].handle
        await postRouteHandler(mockReq, mockRes, mockNext)
        expect(createUrlStorageMock).toHaveBeenCalled()

    })

    test("Should call the right controller on GET route", async () => {
        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockNext = jest.fn()

        await setupUrlRoutes(mongooseMock)

        const getRouteHandler = router.stack.find(layer => layer.route?.path === '/:indexUrl' && layer.route.methods.get).route.stack[0].handle
        await getRouteHandler(mockReq, mockRes, mockNext)
        expect(getUrlStorageMock).toHaveBeenCalled()
    })

    test("Should throw error if setup fails", async () => {
        UrlStorageController.mockImplementationOnce(() => {
            throw new Error("Test controller error")
        })
        
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        try{
            setupUrlRoutes(mongooseMock)
        }catch(error){
            expect(error).toEqual(new Error("Failed to initialize routes"))
        }

        expect(consoleErrorSpy).toHaveBeenCalledWith("Error setting up routes:", expect.any(Error))
        consoleErrorSpy.mockRestore();
    })
})