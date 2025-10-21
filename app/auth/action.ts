import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
    email: z.email({message: "Lütfen geçerli bir e-posta adresi giriniz." }),
    password: z.string().min(6, {message: "Şifre 6 karakterden oluşmalıdır"})
})

export async function login(formData:FormData){

    const validation = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if(!validation.success){
        return{
            error: "Lütfen formdaki hataları düzeltin",
            fieldsError: z.treeifyError(validation.error)
        }
    }

    const { email, password } =  validation.data;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        return{
            error: "Giriş bilgileri hatalı"
        }
    }
    redirect("/")
}