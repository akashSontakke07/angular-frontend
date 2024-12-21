export class ComponentManagerService {
    private static instance: ComponentManagerService | null = null;

    private constructor() { }

    public static getInstance(): ComponentManagerService {
        if (ComponentManagerService.instance === null) {
            ComponentManagerService.instance = new ComponentManagerService();
        }
        return ComponentManagerService.instance;
    }

    // Store components with their names
    private componentPool: Record<string, any> = {};

    public setInComponentPool(component: any, componentName: string): void {
        this.componentPool[componentName] = component;
    }

    public getLatestComponentByName(componentName: string): any | undefined {
        return this.componentPool[componentName];
    }

    public deleteFromComponentPool(componentName: string): void {
        delete this.componentPool[componentName];
    }
}
