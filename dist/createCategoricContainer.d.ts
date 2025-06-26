import { Container, ServiceIdentifier } from "inversify";
export declare const createCategoricContainer: () => {
    readonly install: (container: Container) => void;
    readonly makeChild: (container: Container) => Container;
    readonly singleton: (serviceIdentifier?: ServiceIdentifier) => (target: any) => void;
    readonly transient: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
    readonly request: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
};
//# sourceMappingURL=createCategoricContainer.d.ts.map