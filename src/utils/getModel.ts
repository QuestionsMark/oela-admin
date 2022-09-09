import { Model } from "../components/common/PopupForm";

export function getModel(model: Model) {
    switch (model) {
        case 'CARD':
            return 'cards';

        case 'COLLECTION':
            return 'collections';

        case 'HASHTAG':
            return 'hashtags';

        case 'NEWS':
            return 'news';

        case 'PICTURE':
            return 'pictures';

        case 'PRODUCT':
            return 'products';

        case 'PRODUCT_TYPE':
            return 'product-types';
    }
}