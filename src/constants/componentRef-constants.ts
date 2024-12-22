import { Type } from "@angular/core";
import { ComponentNames } from "./constant-enums";

export const COMPONENT_REF: Record<any, () => Promise<Type<any> | null>> = {
    [ComponentNames.DynamicUiBuilderComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/ui-builder/ui-builder.component");
            return module.UiBuilderComponent;
        } catch (error) {
            throw (error);
        }
    },

    [ComponentNames.NavTabsComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/nav-tabs/nav-tabs.component");
            return module.NavTabsComponent;
        } catch (error) {
            throw (error);
        }
    },

    [ComponentNames.LabelComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/label/label.component");
            return module.LabelComponent;
        } catch (error) {
            throw (error);
        }
    },

    [ComponentNames.CollapseComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/collapse/collapse.component");
            return module.CollapseComponent;
        } catch (error) {
            throw (error);
        }
    },

    [ComponentNames.SimpleButtonComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/simple-button/simple-button.component");
            return module.SimpleButtonComponent;
        } catch (error) {
            throw (error);
        }
    },

    [ComponentNames.ContainerComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/container/container.component");
            return module.ContainerComponent;
        } catch (error) {
            throw (error);
        }
    },


    [ComponentNames.TableComponent]: async () => {
        try {
            const module = await import("src/components/ui-components/table-components/table/table.component");
            return module.TableComponent;
        } catch (error) {
            throw (error);
        }
    },
    // [ComponentNames.DropdownButtonComponent]: async () => {
    //     try {
    //         const module = await import("src/components/ui-components/dropdown-button/dropdown-button.component");
    //         return module.DropdownButtonComponent;
    //     } catch (error) {
    //         throw (error);
    //     }
    // }
};
