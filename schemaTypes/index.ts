import { categories } from "./categories";
import { collections } from "./collections";
import { colorType } from "./colors";
import { HomeUpdate } from "./homeUpdate";
import { materialType } from "./materialType";
import { productType } from "./productType";
import { deliveryStates } from "./ShippingStates";
import { deliveryZones } from "./shippingZones";
import { sizeType } from "./sizes";
import { SpecialOffers } from "./specialOffers";

export const schemaTypes = [
    productType,
    colorType,
    sizeType,
    collections,
    categories,
    SpecialOffers,
    deliveryZones,
    deliveryStates,
    materialType,
    HomeUpdate,
    
   
    
]
