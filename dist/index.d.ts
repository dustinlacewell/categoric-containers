declare module "createCategoricContainer" {
    import { Container, ServiceIdentifier } from "inversify";
    export const createCategoricContainer: () => {
        readonly install: (container: Container) => void;
        readonly makeChild: (container: Container) => Container;
        readonly singleton: (serviceIdentifier?: ServiceIdentifier) => (target: any) => void;
        readonly transient: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
        readonly request: (serviceIdentifier: ServiceIdentifier) => (target: any) => void;
    };
}
declare module "index" {
    export * from "createCategoricContainer";
}
//# sourceMappingURL=index.d.ts.map