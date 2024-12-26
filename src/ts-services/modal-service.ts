// import { DependencNames } from "src/constants/constant-enums";
// import { checkIsNotNull } from "src/ts-files/common-utils";
// import { ComponentManagerService } from "./component-manager-service";


// export interface NgbModalConfig {
//     content?: any;
//     ariaLabelledBy?: string;
//     ariaDescribedBy?: string;
//     size?: string;
//     centered?: boolean;
//     scrollable?: boolean;
//     windowClass?: string;
//     backdrop?: boolean | 'static';
//     keyboard?: boolean;
//     animation?: boolean;
//     container?: any;
//     backdropClass?: string;
//     fullscreen?: boolean;
// }


// export class ModalService {
//     private static instance: ModalService | null = null;
//     private modalStack: any[] = []; // Stack to hold open modals

//     private constructor() { }

//     public static getInstance(): ModalService {
//         if (ModalService.instance === null) {
//             ModalService.instance = new ModalService();
//         }
//         return ModalService.instance;
//     }

//     public async openModal(modalData: any, data?: any, thisObject?: any) {
//         let modalRef = await openModal(modalData, data, thisObject);
//         this.modalStack.push(modalRef);
//     }

//     public closeLatestModal() {
//         if (this.modalStack.length > 0) {
//             const modalRef = this.modalStack.pop();
//             if (modalRef) {
//                 modalRef.close();
//             }
//         }
//     }

//     public closeAllModals() {
//         while (this.modalStack.length > 0) {
//             this.closeLatestModal();
//         }
//     }
// }


// async function openModal(modalData: any, data?: any, thisObject?: any) {
//     modalData = { ...modalData, dataObject: data, thisObject: thisObject };
//     const ngbModal = ComponentManagerService.getInstance().getLatestComponentByName(DependencNames.ngbModal);
//     const ngbModalConfig: NgbModalConfig | undefined = modalData.modalProperties.ngbModalConfig;
//     try {
//         const fetchedModalDetails = await getModalWithModalName(modalData.modalProperties.modalType);
//         if (fetchedModalDetails) {
//             const modalRef: any = ngbModal.open(fetchedModalDetails.component, ngbModalConfig);
//             modalRef.componentInstance.modalData = modalData;
//             return modalRef;
//         }
//     } catch (error) {
//         console.error("Error opening modal:", error);
//     }
//     return null;
// }


// async function getModalWithModalName(modalName: string) {
//     try {
//         if (modalName === 'AccessHierarchyModal') {
//             const { AccessHierarchyComponent } = await import('src/components/ui-components/modal/access-hierarchy/access-hierarchy.component');
//             return { component: AccessHierarchyComponent };
//         } else {
//             console.error(`No modal found for the name: ${modalName}`);
//         }
//     } catch (error) {
//         console.error("Error loading modal component:", error);
//     }
//     return null;
// }