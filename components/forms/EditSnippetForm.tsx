"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSnippetEditStore } from "@/store/snippetEdit";
import { SnippetFormValues } from "@/types/types";
import { snippetFormSchema } from "@/schemas";
import EditSnippetModal from "../modals/EditSnippetModal";
import { cn, renderSnippet } from "@/lib/utils";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface EditSnippetFormProps {
  snippetId: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  snippetCode: string;
  setGeneratedCode: React.Dispatch<React.SetStateAction<string>>;
}

export function EditSnippetForm({ snippetId, isOpen, onClose, title, snippetCode, setGeneratedCode }: EditSnippetFormProps) {
  const { snippets, setSnippetData } = useSnippetEditStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("fe");
  const defaultSnippetData = snippets[snippetId] || { sectionTitle: "", snippets: [] };

  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetFormSchema),
    defaultValues: defaultSnippetData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "snippets",
  });

  // Reset form quand le snippetId ou snippets change
  useEffect(() => {
    form.reset(snippets[snippetId] || { sectionTitle: "", snippets: [] });
    setOpenIndex(null);
  }, [snippets, snippetId, form]);

  // Génération du code dynamique dès qu'une valeur change, pas le choix pour éviter de prendre l'ancienne valeur
  const watchedValues = form.watch();
  useEffect(() => {
    const code = renderSnippet(snippetCode, watchedValues.snippets, watchedValues.sectionTitle);
    setGeneratedCode(code);
  }, [watchedValues, snippetCode, setGeneratedCode]);

  const onSubmit = (values: SnippetFormValues) => {
    setSnippetData(snippetId, values);
    onClose();
  };

  const handleToggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleReset = () => {
    form.reset(defaultSnippetData);
    setOpenIndex(null);
  };

  return (
    <EditSnippetModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("snippets.modal.edit", { title: t(`snippets.database.title.${title}`) })}
      description={t("snippets.modal.description", { title: t(`snippets.database.title.${title}`) })}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="sectionTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">{t("snippets.form.sectionTitle")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("snippets.form.placeholder.title")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg">
              <div className="border-b p-4 flex items-center justify-between">
                <h3>{t(`snippets.database.title.${title}`)} - {index}</h3>
                <div className={cn("flex gap-2")}>
                  <button type="button" onClick={() => handleToggleItem(index)}>
                    <MdModeEditOutline className="text-xl text-gray-600" />
                  </button>
                  <button type="button" onClick={() => remove(index)}>
                    <MdDelete className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              {openIndex === index && (
                <div className="p-6 flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name={`snippets.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">{t("snippets.form.title")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("snippets.form.placeholder.title")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`snippets.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">{t("snippets.form.content")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t("snippets.form.placeholder.content")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`snippets.${index}.image`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">{t("snippets.form.image")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          ))}

          <div className={cn("flex flex-col gap-6")}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className={cn("w-full flex items-center gap-2 font-medium hover:bg-gray-100 hover:text-foreground rounded-lg")}
              onClick={() => append({ title: "", text: "", image: "" })}
            >
              <IoAddCircleOutline className="text-lg" />
              {t("snippets.add")}
            </Button>

            <div className="flex flex-col items-start justify-start gap-2 lg:flex-row lg:justify-between lg:items-center">
              <Button type="button" variant="link" className="text-foreground" onClick={handleReset}>
                {t("snippets.reset")}
              </Button>
              <div className={cn("w-full flex gap-2 items-center justify-end")}>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="hover:bg-gray-100 hover:text-foreground w-full lg:w-auto"
                  onClick={onClose}
                >
                  {t("snippets.cancel")}
                </Button>
                <Button type="submit" variant="secondary" size="lg" className="w-full lg:w-auto">
                  {t("snippets.save")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </EditSnippetModal>
  );
}
