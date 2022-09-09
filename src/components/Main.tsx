import { Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Collections } from "./collections/Collections";
import { News } from "./news/News";
import { Products } from "./products/Products";
import { ProductTypes } from "./product-types/ProductTypes";
import { Hashtags } from "./hashtags/Hashtags";
import { NotFoundView } from "./NotFoundView";
import { EditPage } from "./common/EditPage";
import { Covers } from "./covers/Covers";

export const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<EditPage model="COLLECTION" />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<EditPage model="NEWS" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<EditPage model="PRODUCT" />} />
            <Route path="/product-types" element={<ProductTypes />} />
            <Route path="/hashtags" element={<Hashtags />} />
            <Route path="/covers" element={<Covers />} />
            <Route path="*" element={<NotFoundView />} />
        </Routes>
    );
};