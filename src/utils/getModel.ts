import { Model } from "types";

export function getModel(model: Model) {
    switch (model) {
        case 'COLLECTION':
            return 'collection';

        case 'HASHTAG':
            return 'hashtag';

        case 'NEWS':
            return 'news';

        case 'PRODUCT':
            return 'product';

        case 'PRODUCT_TYPE':
            return 'product-type';
    }
}