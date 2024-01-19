'use client'
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/api/issues/IssueSchema";
import { z } from "zod";
import { ErrorMessage } from "@/app/component/errorMessage";
import { Spinner } from '@/app/component/Spinner'

type IssueForm = z.infer<typeof issueSchema>;

export default function newIssue(){
    const router = useRouter();
    const [err, setErr] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)
    });

    return(
    <div className="max-w-xl space-y-3" >
        {err &&  
        <Callout.Root>
            <Callout.Text>{err}</Callout.Text>
        </Callout.Root>}
        <form 
        onSubmit={handleSubmit(async (data) => {
            try {
                setSubmitting(true)
                await axios.post('/api/issues', data);
                router.push('/issues')
            } catch (error) {
                setErr('An unexpected error occured.')
            }
        })}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            <Controller 
                name="description"
                control={control}
                render={({ field }) => <SimpleMdeReact placeholder="Description" {...field}/>}
            />
            {errors.description && <ErrorMessage>{errors.description .message}</ErrorMessage>}
            <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner />} </Button>
        </form>
    </div>
    )
}
