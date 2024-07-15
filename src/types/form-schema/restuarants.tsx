import * as yup from 'yup';

const MenuItemSchema = yup.object().shape({
    name: yup.string().required('Food name is required !'),
    description: yup.string(),
    cuisine: yup.string().required('Food cuisine is required !'),
    foodType: yup.string().required('Food type is required !'),
    price: yup.number().required('Food price is required !'),
    tags: yup.string(),
});

const AddressSchema = yup.object().shape({
    streetName: yup.string().required("Street name is required !"),
    city: yup.string().required("City is required !"),
    state: yup.string().required("State is required !"),
    country: yup.string().required("Country is required !"),
    zipcode: yup.string().required("Zipcode is required !")
});

const MenuSchema = yup.object().shape({
    menu: MenuItemSchema.required()
});

const LocationSchema = yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    address: AddressSchema.required()
});

const ContactSchema = yup.object().shape({
    mobile: yup.string().required("Mobile number is required !"),
    email: yup.string().required("Email is required !").email("Invalid Email !")
});
  
const ContactsSchema = yup.object().shape({
    primary: ContactSchema.required(),
    secondary: ContactSchema.optional(),
    website: yup.string().optional().url("Invalid URL !")
});

export const restuarantFormSchema = yup.object().shape({
    name: yup.string().
        required('Restuarant name is required !'),
    description: yup.string(),
    cuisine: yup.string().
        required('Cuisine name is required !'),
    location: LocationSchema.required(),
    contacts: ContactsSchema.required(),
    menuItems: yup.array().of(MenuSchema).required(),
    status: yup.string(),
    tags: yup.string(),
})