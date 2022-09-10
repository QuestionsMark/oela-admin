import { ProductElement } from "../components/products/ProductForm";
import { SpecificationInterface } from "types";
import { ImagePreview } from "../react-types/form-types";
import { setPreviewForFiles } from "../utils/imagesPreviewSetter";
import { NewsElement } from "../components/news/NewsForm";
import { CoverElement } from "../components/covers/CoverForm";

interface FormState {
    products?: string[];
    description?: string;
    hashtags?: string[];
    images?: File[] | null;
    name?: string;
    preview?: ImagePreview[];
    productType?: string;
    shopLink?: string;
    specifications?: Omit<SpecificationInterface, 'id'>[];
}

interface FormSet {
    type: 'FORM_SET';
    payload: ProductElement | NewsElement | CoverElement;
}
interface NameChange {
    type: 'NAME_CHANGE';
    payload: string;
}
interface DescriptionChange {
    type: 'DESCRIPTION_CHANGE';
    payload: string;
}
interface ShopLinkChange {
    type: 'SHOP_LINK_CHANGE';
    payload: string;
}
interface ProductTypeChange {
    type: 'PRODUCT_TYPE_CHANGE';
    payload: string;
}
interface ImagesChange {
    type: 'IMAGES_CHANGE';
    payload: File[] | null;
}
interface ImagesDelete {
    type: 'IMAGES_DELETE';
    payload: number;
}
interface ImagesOrderChange {
    type: 'IMAGES_ORDER_CHANGE';
    payload: number;
}
interface SpecificationsChange {
    type: 'SPECIFICATIONS_CHANGE';
    payload: {
        type: 'NAME' | 'DESCRIPTION';
        index: number;
        value: string;
    };
}
interface SpecificationsAdd {
    type: 'SPECIFICATIONS_ADD';
}
interface SpecificationsDelete {
    type: 'SPECIFICATIONS_DELETE';
    payload: number;
}
interface PreviewAltChange {
    type: 'PREVIEW_ALT_CHANGE';
    payload: {
        index: number;
        value: string;
    };
}
interface CardsChange {
    type: 'CARDS_CHANGE';
    payload: string;
}
interface HashtagsChange {
    type: 'HASHTAGS_CHANGE';
    payload: string;
}

export type FormAction = FormSet | NameChange | DescriptionChange | ShopLinkChange | ProductTypeChange | ImagesChange | ImagesDelete | ImagesOrderChange | PreviewAltChange | SpecificationsChange | SpecificationsAdd | SpecificationsDelete | CardsChange | HashtagsChange;

const specification: Omit<SpecificationInterface, 'id'> = {
    name: '',
    value: '',
};


export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'DESCRIPTION_CHANGE': {
            return {
                ...state,
                description: action.payload,
            };
        }

        case 'IMAGES_CHANGE': {
            const { payload } = action;
            if (state.images && payload && payload.length > 0) {
                return {
                    ...state,
                    images: [...state.images, ...payload],
                    preview: [...(state.preview as ImagePreview[]), ...setPreviewForFiles(payload)],
                }
            }
            if (!state.images) {
                return {
                    ...state,
                    images: payload && payload.length > 0 ? payload : null,
                    preview: setPreviewForFiles(payload && payload.length > 0 ? payload : []),
                }
            }
            return {
                ...state,
            }
        }

        case 'IMAGES_DELETE': {
            const { payload } = action;
            const newImages = state.images?.filter((image, i) => i !== payload);
            const newPreview = newImages && newImages.length > 0 ? state.preview?.filter((image, i) => i !== payload) : [];
            return {
                ...state,
                images: newImages && newImages.length > 0 ? newImages : null,
                preview: newPreview,
            }
        }

        case 'IMAGES_ORDER_CHANGE': {
            if (!state.images || state.images.length < 2 || !state.preview || state.preview.length < 2) return state;
            const { payload } = action;
            const images = [...state.images];
            const prevImg = images[payload - 1];
            const img = images[payload];
            const restImg = images.slice(payload + 1);

            const previews = [...state.preview];
            const prevPreview = previews[payload - 1];
            const preview = previews[payload];
            const restPreviews = previews.slice(payload + 1);
            return {
                ...state,
                images: [...images.splice(0, payload - 1), img, prevImg, ...restImg],
                preview: [...previews.splice(0, payload - 1), preview, prevPreview, ...restPreviews],
            }
        }

        case 'NAME_CHANGE': {
            return {
                ...state,
                name: action.payload,
            };
        }

        case 'PREVIEW_ALT_CHANGE': {
            return {
                ...state,
                preview: state.preview?.map((p, i) => {
                    const { index, value } = action.payload;
                    if (index === i) return { ...p, alt: value };
                    return p;
                }),
            };
        }

        case 'PRODUCT_TYPE_CHANGE': {
            return {
                ...state,
                productType: action.payload,
            };
        }

        case 'SHOP_LINK_CHANGE': {
            return {
                ...state,
                shopLink: action.payload,
            };
        }

        case 'SPECIFICATIONS_ADD': {
            return {
                ...state,
                specifications: [...state.specifications as Omit<SpecificationInterface, 'id'>[], specification],
            }
        }

        case 'SPECIFICATIONS_CHANGE': {
            return {
                ...state,
                specifications: state.specifications?.map((s, i) => {
                    const { index, type, value } = action.payload;
                    if (type === "NAME") {
                        if (index === i) return { name: value, value: s.value };
                        return s;
                    } else if (type === "DESCRIPTION") {
                        if (index === i) return { name: s.name, value: value };
                        return s;
                    }
                    return s;
                }) as SpecificationInterface[],
            }
        }

        case 'SPECIFICATIONS_DELETE': {
            return {
                ...state,
                specifications: state.specifications?.filter((s, i) => i !== action.payload),
            }
        }

        case 'FORM_SET': {
            return action.payload;
        }

        case 'CARDS_CHANGE': {
            const { payload } = action;
            const isChecked = state.products?.findIndex(c => c === payload) !== -1;
            if (isChecked) return { ...state, products: state.products?.filter(c => c !== payload) };
            return { ...state, products: [...state.products as string[], payload] };
        }

        case 'HASHTAGS_CHANGE': {
            const { payload } = action;
            const isChecked = state.hashtags?.findIndex(c => c === payload) !== -1;
            if (isChecked) return { ...state, hashtags: state.hashtags?.filter(c => c !== payload) };
            return { ...state, hashtags: [...state.hashtags as string[], payload] };
        }

        default:
            return state;
    }
};