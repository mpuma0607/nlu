import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { generateBusinessPlan } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTracking } from '@/lib/hooks/use-tracking'

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  targetAudience: z.string().min(10, {
    message: "Target audience must be at least 10 characters.",
  }),
  problem: z.string().min(10, {
    message: "Problem must be at least 10 characters.",
  }),
  solution: z.string().min(10, {
    message: "Solution must be at least 10 characters.",
  }),
});

const BizPlanForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [plan, setPlan] = useState<string>('');
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const { trackToolUsage, trackContentInteraction } = useTracking()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      targetAudience: "",
      problem: "",
      solution: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await trackToolUsage('bizplan-ai', 'generate-plan')

    try {
      const response = await generateBusinessPlan({
        ...values,
        userId: user?.id || '',
      });

      setPlan(response?.plan || '');
      toast({
        title: "Business plan generated!",
        description: "Your business plan has been generated successfully.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to generate business plan. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  }

  const downloadPDF = async () => {
    setIsPdfLoading(true);
    await trackContentInteraction('bizplan-ai', 'pdf-download')

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: plan }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'business-plan.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        toast({
          title: "PDF downloaded!",
          description: "Your business plan has been downloaded successfully.",
        })
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to download PDF. Please try again.",
      })
    } finally {
      setIsPdfLoading(false);
    }
  };

  const sendEmail = async () => {
    setIsEmailLoading(true);
    await trackContentInteraction('bizplan-ai', 'email-send')

    try {
      if (!user?.emailAddresses[0]?.emailAddress) {
        throw new Error('No email address found. Please update your profile.');
      }

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user?.emailAddresses[0]?.emailAddress,
          subject: 'Your Business Plan',
          text: plan,
        }),
      });

      if (response.ok) {
        toast({
          title: "Email sent!",
          description: "Your business plan has been sent to your email address.",
        })
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to send email. Please try again.",
      })
    } finally {
      setIsEmailLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await trackContentInteraction('bizplan-ai', 'copy-content')

    try {
      await navigator.clipboard.writeText(plan);
      toast({
        title: "Copied to clipboard!",
        description: "Your business plan has been copied to clipboard.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to copy to clipboard. Please try again.",
      })
    }
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="E-commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target audience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tech-savvy millennials and Gen Z interested in sustainable products"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Lack of access to affordable and sustainable products"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="An online marketplace offering curated sustainable products at competitive prices"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Generating...
                <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </>
            ) : "Generate"}
          </Button>
        </form>
      </Form>

      {plan && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Business Plan</h2>
          <div className="whitespace-pre-line border rounded-md p-4">{plan}</div>

          <div className="flex justify-end mt-4 space-x-4">
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
            <Button onClick={downloadPDF} disabled={isPdfLoading}>
              {isPdfLoading ? (
                <>
                  Downloading...
                  <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </>
              ) : "Download as PDF"}
            </Button>
            <Button onClick={sendEmail} disabled={isEmailLoading}>
              {isEmailLoading ? (
                <>
                  Sending...
                  <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </>
              ) : "Send to Email"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BizPlanForm;
