import { createClassCategoric } from "@ldlework/categoric-decorators"
import { Container, injectable, ServiceIdentifier } from "inversify"


type metadata = {
    serviceIdentifier?: ServiceIdentifier
}

export const createCategoricContainer = () => {

    const [_singleton, _locateSingletons] = createClassCategoric<metadata>()
    const [_transient, _locateTransients] = createClassCategoric<metadata>()
    const [_request, _locateRequests] = createClassCategoric<metadata>()

    const singleton = (serviceIdentifier?: ServiceIdentifier) => {
        return (target: any) => {
            _singleton({ serviceIdentifier })(target)
            injectable()(target)
        }
    }

    const installSingletons = (container: Container) => {
        const singletons = _locateSingletons()
        for (const [ target, { data } ] of singletons) {
            const { serviceIdentifier } = data
            container
                .bind(serviceIdentifier || target as ServiceIdentifier)
                .to(target as any)
                .inSingletonScope()
        }
    }

    const transient = (serviceIdentifier: ServiceIdentifier) => {
        return (target: any) => {
            _transient({ serviceIdentifier })(target)
            injectable()(target)
        }
    }

    const installTransients = (container: Container) => {
        const transients = _locateTransients()
        for (const [ target, { data } ] of transients) {
            const { serviceIdentifier } = data
            container
                .bind(serviceIdentifier || target as ServiceIdentifier)
                .to(target as any)
                .inTransientScope()
        }
    }

    const request = (serviceIdentifier: ServiceIdentifier) => {
        return (target: any) => {
            _request({ serviceIdentifier })(target)
            injectable()(target)
        }
    }

    const installRequests = (container: Container) => {
        const requests = _locateRequests()
        for (const [ target, { data } ] of requests) {
            const { serviceIdentifier } = data
            container
                .bind(serviceIdentifier || target as ServiceIdentifier)
                .to(target as any)
                .inRequestScope()
        }
    }

    const install = (container: Container) => {
        installSingletons(container)
        installTransients(container)
        installRequests(container)
    }

    const makeChild = (container: Container) => {
        const child = new Container({ parent: container })
        install(child)
        return child
    }

    return { install, makeChild, singleton, transient, request } as const
}