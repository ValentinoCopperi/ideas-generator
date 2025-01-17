import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {  SignUpFormState } from '@/lib/zod/signup-form-schema';
import {  type FC } from 'react'




interface Props {
    name: 'email'
    state: SignUpFormState
}

const TextAreaInputEmail: FC<Props> = ({ name, state }) => {


    return (
        <FormField
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold">Please insert your {name}</FormLabel>
                    <FormControl>
                        <div className='relative'>
                            <Input
                                type="email"
                                placeholder={`${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}...`}
                                {...field}
                            />
                        </div>

                    </FormControl>

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

export default TextAreaInputEmail;