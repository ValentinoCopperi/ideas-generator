import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterFormState } from '@/lib/zod/register-form-schema';
import {  type FC } from 'react'


type names = 'email' | 'username' | 'password' | 'confirmPassword'

interface Props {
    name: names
    state: RegisterFormState,

}

const TextAreaInput: FC<Props> = ({ name, state }) => {


    const getName = (name : names) => {
        if(name === "confirmPassword") return "Confirm Password"

        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    }

    return (
        <FormField
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="font-semibold">Please insert your {getName(name)}</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder={`${getName(name)}...`}
                            {...field}
                        />
                    </div>
                </FormControl>

                {/* Contenedor con altura fija para los mensajes de error */}
                <div className="h-1"> {/* Esto mantiene el espacio reservado para los errores */}
                    {state?.errors?.[name] && (
                        <FormMessage className="text-red-500">
                            {state.errors?.[name].join(', ')}
                        </FormMessage>
                    )}
                </div>
            </FormItem>
        )}
    />
    )
}

export default TextAreaInput;