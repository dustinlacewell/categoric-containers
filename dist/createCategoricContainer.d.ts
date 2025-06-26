import { Container, ServiceIdentifier } from "inversify";
export { Container, ServiceIdentifier } from "inversify";
export type metadata = {
    serviceIdentifier?: ServiceIdentifier;
};
export declare const createCategoricContainer: <T extends metadata = metadata>() => {
    readonly install: (container: Container) => void;
    readonly makeChild: (container: Container) => Container;
    readonly singleton: (serviceIdentifier?: ServiceIdentifier) => (target: any) => void;
    readonly transient: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
    readonly request: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
};
//# sourceMappingURL=createCategoricContainer.d.ts.map