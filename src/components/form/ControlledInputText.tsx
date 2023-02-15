import { classNames } from 'primereact/utils';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues
} from 'react-hook-form';
import type { FormErrorModel } from '@/models/form/form-error-model';

import { StyledInputText } from '@/theme/styled-components';

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

const ControlledInputText = <FormModel extends FieldValues>({
  name,
  label,
  control,
  errors,
  disabled
}: TextInputProps<FormModel>) => {
  const { t } = useTranslation();

  const errorMessage = (fieldName: string) => {
    const error: FormErrorModel | undefined = errors[
      fieldName
    ] as FormErrorModel;
    if (error) {
      const errorMessage: string =
        typeof error.message === 'string'
          ? error.message
          : t(`form.error.${error.message.key}`, {
              field: label.toLowerCase(),
              value: error.message.value
            }).toString();
      return <small className="p-error">{errorMessage}</small>;
    }
    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <span className="p-float-label">
            <StyledInputText
              id={field.name}
              value={field.value}
              className={`${classNames({
                'p-invalid': fieldState.error
              })}`}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
            />
            <label htmlFor={field.name}>{label}</label>
          </span>
          {errorMessage(field.name)}
        </>
      )}
    />
  );
};

export default ControlledInputText;
