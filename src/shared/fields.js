import { useFormInput } from "./utils";

export const useSignupFields =  () => {
    return [
        {
            id: "display_name",
            label: "Name",
            required: true,
            input: {

                props: {

                    type: "text",
                    placeholder: "Solia Bratash"
                },
                state: useFormInput("")
            }
        },
        {
            id: "email",
            label: "Email",
            required: true,
            input: {

                props: {

                    type: "email",
                    placeholder: "solia@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {

                props: {

                    type: "password",
                    placeholder: "*********"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useLoginFields = () => {

    return [

        {
            id: "email",
            label: "Email",
            required: true,
            input: {
                
                props: {
                    type: "email",
                    placeholder: "solia@gmail.com"
                },
                state: useFormInput("")
            }
        },
        {
            id: "password",
            label: "Password",
            required: true,
            input: {
                
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: useFormInput("")
            }
        }
    ];
}

export const useCreatePlaceFields = () => {
    return [
        {
            id: "title",
            label: "Title",
            required: true,
            input: {
                props: {
                    type: "title",
                    placeholder: "Lviv National Academic Opera"
                },
                state: useFormInput("")
            }
        },
        {
            id: "description",
            label: "Description",
            required: true,
            input: {

                props: {
                    type: "description",
                    placeholder: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
                },
                state: useFormInput("")
            }
        },
        {
            id: "img",
            label: "Image",
            required: true,
            input: {
                props: {
                    type: "img",
                    placeholder: "https://src_path"
                },
                state: useFormInput("")
            }
        },
        {
            id: "lat",
            label: "Latitude",
            required: true,
            input: {
                props: {
                    type: "lat",
                    placeholder: "49.8210729"
                },
                state: useFormInput("")
            }
        },
        {
            id: "lng",
            label: "Longitude",
            required: true,
            input: {
                props: {
                    type: "lng",
                    placeholder: "24.041532"
                },
                state: useFormInput("")
            }
        },
        {
            id: "tag",
            label: "Tags",
            input: {
                props: {
                    type: "tag",
                    placeholder: "center-opera-lviv-park"
                },
                state: useFormInput("")
            }
        },
    ];
}