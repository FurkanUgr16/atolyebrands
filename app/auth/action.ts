"use server"
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { LoginState } from "@/types/LoginState";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
    email: z.email({message: "Lütfen geçerli bir e-posta adresi giriniz." }),
    password: z.string().min(6, {message: "Şifre 6 karakterden oluşmalıdır"})
})

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const validation = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    
    if(!validation.success){
        return {
            error: "Lütfen formdaki hataları düzeltin",
            fieldErrors: {
                email: z.treeifyError(validation.error).properties?.email?.errors,
                password: z.treeifyError(validation.error).properties?.password?.errors
            }
        }
    }
    
    const { email, password } = validation.data;
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    
    if(error){
        console.log("Supabase Auth Error:", error);
        return {
            error: `Giriş bilgileri hatalı: ${error.message}`
        }  
    }

    // const { data: profile } = await supabase
    // .from("profiles")
    // .select("role")
    // .eq("user_id", data.user.id)
    // .single()

    // const userRole = profile?.role
    // console.log("Login Action User Role:", userRole);

    // if (userRole === "admin") {
    //     redirect("/admin")
    // }else if (userRole === "dealer") {
    //     redirect("/dealer")
    // }else{
    //     redirect("/")
    // }
    redirect("/")
  
}