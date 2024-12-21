import { Type } from "@angular/core";
import { ComponentNames } from "./constant-enums";

export const COMPONENT_REF: Record<any, () => Promise<Type<any> | null>> = {
    [ComponentNames.DynamicUiBuilderComponent]: async () => {
        try {
            const module = await import("src/components/controllers/dynamic-load-controller/dynamic-load-controller.component");
            return module.DynamicLoadControllerComponent;
        } catch (error) {
            throw (error);
        }
    }
};
