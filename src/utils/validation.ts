import { ProductInterface, NewsInterface, CollectionInterface, HashtagInterface, ProductTypeInterface, CoverInterface } from "types";
import { ProductElement } from "../components/products/ProductForm";
import { NewsElement } from "../components/news/NewsForm";
import { CollectionElement } from "../components/collections/CollectionForm";
import { HashtagElement } from "../components/hashtags/HashtagForm";
import { ProductTypeElement } from "../components/product-types/ProductTypesForm";
import { CoverElement } from "../components/covers/CoverForm";

const checkChanges = (actualData: ProductElement, prevData: ProductInterface): boolean => {
    const checkSpecifications = (): boolean => {
        if (actualData.specifications.length !== prevData.specifications.length) return false;
        let changes = [...prevData.specifications];
        for (const { value, name } of actualData.specifications) {
            changes = changes.filter(s => s.value !== value || s.name !== name);
        }
        return changes.length === 0 || false;
    }

    return actualData.description === prevData.description &&
        actualData.name === prevData.name &&
        actualData.productType === prevData.productType.id &&
        actualData.shopLink === prevData.shopLink &&
        checkSpecifications() &&
        actualData.preview?.length === 0
};

const checkNewsChanges = (actualData: NewsElement, prevData: NewsInterface): boolean => {
    return actualData.description === prevData.description &&
        actualData.name === prevData.name &&
        actualData.preview?.length === 0
};

const checkCollectionChanges = (actualData: CollectionElement, prevData: CollectionInterface): boolean => {
    const checkCards = (): boolean => {
        if (actualData.products.length !== prevData.products.length) return false;
        let changes = [...prevData.products];
        for (const cardId of actualData.products) {
            changes = changes.filter(s => s.id !== cardId);
        }
        return changes.length === 0 || false;
    }

    return actualData.description === prevData.description &&
        actualData.name === prevData.name &&
        actualData.preview?.length === 0 &&
        checkCards()
};

export function checkProductValidation(product: ProductElement): string[] {
    const errors: string[] = [];

    const { description, name, preview, productType, shopLink, specifications } = product;

    if (!name || name.length > 100) {
        errors.push('Nazwa produktu powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length < 2) {
        errors.push('Produkt musi zawierać conajmniej 2 zdjęcia.');
    }

    const checkImageAlt = preview.find(i => i.alt === '');
    if (checkImageAlt) {
        errors.push('Grafiki powinny mieć swoje opisy.');
    }

    if (!description || description.length > 1000) {
        errors.push('Opis produktu powinien zawierać od 1 do 1000 znaków.');
    }

    if (!productType) {
        errors.push('Wybierz typ produktu.');
    }

    if (!shopLink) {
        errors.push('Podaj link do sklepu.');
    }

    if (specifications.length > 0) {
        let error = false;
        for (const spec of specifications) {
            if (!spec.value || !spec.name) {
                error = true;
            }
        }
        if (error) {
            errors.push('Nieprawidłowe dane w specyfikacjach.');
        }
    }

    return errors;
}

export function checkEditProductValidation(product: ProductElement, prev: ProductInterface): string[] {
    const errors: string[] = [];

    const { description, name, preview, productType, shopLink, specifications } = product;

    if (!name || name.length > 100) {
        errors.push('Nazwa produktu powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length !== 0) {
        const checkImageAlt = preview.find(i => i.alt === '');
        if (checkImageAlt) {
            errors.push('Grafiki powinny mieć swoje opisy.');
        }
    }

    if (!description || description.length > 1000) {
        errors.push('Opis produktu powinien zawierać od 1 do 1000 znaków.');
    }

    if (!productType) {
        errors.push('Wybierz typ produktu.');
    }

    if (!shopLink) {
        errors.push('Podaj link do sklepu.');
    }

    if (specifications.length > 0) {
        let error = false;
        for (const spec of specifications) {
            if (!spec.value || !spec.name) {
                error = true;
            }
        }
        if (error) {
            errors.push('Nieprawidłowe dane w specyfikacjach.');
        }
    }

    if (checkChanges(product, prev)) {
        errors.push('Nie wykryto żadnych zmian.')
    }

    return errors;
}




// NEWS:

export function checkNewsValidation(news: NewsElement): string[] {
    const errors: string[] = [];

    const { description, name, preview } = news;

    if (!name || name.length > 100) {
        errors.push('Nazwa nowości powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length < 1) {
        errors.push('Nowość musi zawierać conajmniej 1 zdjęcie.');
    }

    const checkImageAlt = preview.find(i => i.alt === '');
    if (checkImageAlt) {
        errors.push('Grafiki powinny mieć swoje opisy.');
    }

    if (!description || description.length > 1000) {
        errors.push('Opis nowości powinien zawierać od 1 do 1000 znaków.');
    }

    return errors;
}

export function checkEditNewsValidation(news: NewsElement, prev: NewsInterface): string[] {
    const errors: string[] = [];

    const { description, name, preview } = news;

    if (!name || name.length > 100) {
        errors.push('Nazwa nowości powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length !== 0) {
        const checkImageAlt = preview.find(i => i.alt === '');
        if (checkImageAlt) {
            errors.push('Grafiki powinny mieć swoje opisy.');
        }
    }

    if (!description || description.length > 1000) {
        errors.push('Opis nowości powinien zawierać od 1 do 1000 znaków.');
    }

    if (checkNewsChanges(news, prev)) {
        errors.push('Nie wykryto żadnych zmian.')
    }

    return errors;
}





// COLLECTION:

export function checkCollectionValidation(collection: CollectionElement): string[] {
    const errors: string[] = [];

    const { description, name, preview } = collection;

    if (!name || name.length > 100) {
        errors.push('Nazwa kolekcji powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length < 2) {
        errors.push('Kolekcja musi zawierać conajmniej 2 zdjęcia.');
    }

    const checkImageAlt = preview.find(i => i.alt === '');
    if (checkImageAlt) {
        errors.push('Grafiki powinny mieć swoje opisy.');
    }

    if (!description || description.length > 1000) {
        errors.push('Opis kolekcji powinien zawierać od 1 do 1000 znaków.');
    }

    return errors;
}

export function checkEditCollectionValidation(collection: CollectionElement, prev: CollectionInterface): string[] {
    const errors: string[] = [];
    const { description, name, preview } = collection;

    if (!name || name.length > 100) {
        errors.push('Nazwa kolekcji powinna zawierać od 1 do 100 znaków.');
    }

    if (preview.length !== 0) {
        const checkImageAlt = preview.find(i => i.alt === '');
        if (checkImageAlt) {
            errors.push('Grafiki powinny mieć swoje opisy.');
        }
    }

    if (!description || description.length > 1000) {
        errors.push('Opis kolekcji powinien zawierać od 1 do 1000 znaków.');
    }

    if (checkCollectionChanges(collection, prev)) {
        errors.push('Nie wykryto żadnych zmian.')
    }

    return errors;
}







// HASHTAG:

export function checkHashtagValidation(hashtag: HashtagElement): string[] {
    const errors: string[] = [];

    const { name } = hashtag;

    if (!name || name.length > 100) {
        errors.push('Nazwa hashtagu powinna zawierać od 1 do 100 znaków.');
    }

    return errors;
}

export function checkEditHashtagValidation(hashtag: HashtagElement, prev: HashtagInterface): string[] {
    const errors: string[] = [];
    const { name } = hashtag;
    if (!name || name.length > 100) {
        errors.push('Nazwa hashtagu powinna zawierać od 1 do 100 znaków.');
    }

    if (hashtag.name === prev.name) {
        errors.push('Nie wykryto żadnych zmian.')
    }

    return errors;
}






// PRODUCT_TYPE:

export function checkProductTypeValidation(productType: ProductTypeElement): string[] {
    const errors: string[] = [];

    const { name } = productType;

    if (!name || name.length > 100) {
        errors.push('Nazwa typu produktu powinna zawierać od 1 do 100 znaków.');
    }

    return errors;
}

export function checkEditProductTypeValidation(productType: ProductTypeElement, prev: ProductTypeInterface): string[] {
    const errors: string[] = [];
    const { name } = productType;
    if (!name || name.length > 100) {
        errors.push('Nazwa typu produktu powinna zawierać od 1 do 100 znaków.');
    }

    if (productType.name === prev.name) {
        errors.push('Nie wykryto żadnych zmian.')
    }

    return errors;
}





// COVER:

export function checkCoverValidation(cover: CoverElement): string[] {
    const errors: string[] = [];

    const { preview } = cover;

    if (preview.length < 1) {
        errors.push('Dodaj conajmniej jedną grafikę.');
    }

    const checkImageAlt = preview.find(i => i.alt === '');
    if (checkImageAlt) {
        errors.push('Grafika powinna mieć swój opis.');
    }

    return errors;
}

export function checkEditCoverValidation(cover: CoverElement, prev: CoverInterface): string[] {
    const errors: string[] = [];
    const { preview } = cover;
    if (preview.length < 2) {
        errors.push('Okładka musi zawierać dokładnie jedną grafikę.');
    }

    const checkImageAlt = preview.find(i => i.alt === '');
    if (checkImageAlt) {
        errors.push('Grafika powinna mieć swój opis.');
    }

    return errors;
}