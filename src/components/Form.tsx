import {
  Component,
  For,
  Show,
  createSignal,
  createEffect,
  JSX,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../utils/cn';
import { Window } from './Window';
import { Button } from './Button';
import './Form.css';

export interface FormField {
  id: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | boolean;
  options?: Array<{ value: string | number; label: string }>; // For select/radio
  rows?: number; // For textarea
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface FormButton {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'default' | 'normal';
  onClick?: (data: Record<string, any>) => void;
  disabled?: boolean;
}

export interface FormProps {
  title: string;
  fields: FormField[];
  buttons?: FormButton[];
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: Record<string, any>) => void;
  width?: string;
  height?: string;
  class?: string;
  labelWidth?: string; // CSS width for consistent label alignment
}

export const Form: Component<FormProps> = (props) => {
  const [formData, setFormData] = createSignal<Record<string, any>>({});
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  // Initialize form data with default values
  const initializeFormData = () => {
    const initialData: Record<string, any> = {};
    props.fields.forEach((field) => {
      initialData[field.id] =
        field.value ?? (field.type === 'checkbox' ? false : '');
    });
    setFormData(initialData);
  };

  // Initialize when component mounts or fields change
  createEffect(() => {
    if (props.isOpen) {
      initializeFormData();
    }
  });

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const val = String(value);

      if (
        field.validation.minLength &&
        val.length < field.validation.minLength
      ) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }

      if (
        field.validation.maxLength &&
        val.length > field.validation.maxLength
      ) {
        return `${field.label} cannot exceed ${field.validation.maxLength} characters`;
      }

      if (
        field.validation.pattern &&
        !new RegExp(field.validation.pattern).test(val)
      ) {
        return `${field.label} format is invalid`;
      }

      if (field.type === 'number') {
        const numVal = Number(value);
        if (
          field.validation.min !== undefined &&
          numVal < field.validation.min
        ) {
          return `${field.label} must be at least ${field.validation.min}`;
        }
        if (
          field.validation.max !== undefined &&
          numVal > field.validation.max
        ) {
          return `${field.label} cannot exceed ${field.validation.max}`;
        }
      }
    }

    return '';
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => {
      // Solo actualiza si el valor realmente cambió
      if (prev[fieldId] === value) return prev;
      return { ...prev, [fieldId]: value };
    });

    // Clear error when user starts typing
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    props.fields.forEach((field) => {
      const error = validateField(field, formData()[field.id]);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (validateForm()) {
      props.onSubmit?.(formData());
    }
  };

  const handleButtonClick = (button: FormButton) => {
    if (button.type === 'submit' || !button.type) {
      const form = document.getElementById('windows-form') as HTMLFormElement;
      form?.requestSubmit();
    } else if (button.onClick) {
      button.onClick(formData());
    }
  };

  const renderField = (field: FormField) => {
    const fieldValue = () => formData()[field.id];
    const hasError = () => !!errors()[field.id];

    const inputProps = {
      id: field.id,
      name: field.id,
      disabled: field.disabled,
      required: field.required,
      placeholder: field.placeholder,
      'aria-describedby': hasError() ? `${field.id}-error` : undefined,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...inputProps}
            rows={field.rows || 3}
            value={fieldValue() || ''}
            onInput={(e) => handleFieldChange(field.id, e.currentTarget.value)}
          />
        );

      case 'select':
        return (
          <select
            {...inputProps}
            value={fieldValue() || ''}
            onChange={(e) => handleFieldChange(field.id, e.currentTarget.value)}
          >
            <option value=''>Select an option</option>
            <For each={field.options}>
              {(option) => <option value={option.value}>{option.label}</option>}
            </For>
          </select>
        );

      case 'checkbox':
        return (
          <div class='checkbox-wrapper'>
            <input
              {...inputProps}
              type='checkbox'
              checked={fieldValue() || false}
              onChange={(e) =>
                handleFieldChange(field.id, e.currentTarget.checked)
              }
            />
            <label for={field.id}>{field.label}</label>
          </div>
        );

      case 'radio':
        return (
          <div class='radio-group'>
            <For each={field.options}>
              {(option, index) => (
                <div class='radio-item'>
                  <input
                    type='radio'
                    id={`${field.id}_${index()}`}
                    name={field.id}
                    value={option.value}
                    checked={fieldValue() === option.value}
                    disabled={field.disabled}
                    onChange={(_e) => handleFieldChange(field.id, option.value)}
                  />
                  <label for={`${field.id}_${index()}`}>{option.label}</label>
                </div>
              )}
            </For>
          </div>
        );

      default:
        return (
          <input
            {...inputProps}
            type={field.type}
            value={fieldValue() || ''}
            onInput={(e) => handleFieldChange(field.id, e.currentTarget.value)}
          />
        );
    }
  };

  const formClass = () => cn('windows-form', props.class);

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class='form-overlay' onClick={() => props.onClose?.()}>
          <div class='form-container' onClick={(e) => e.stopPropagation()}>
            <Window
              title={props.title}
              width={props.width || '500px'}
              height={props.height}
              onClose={props.onClose}
              active
            >
              <form
                id='windows-form'
                class={formClass()}
                onSubmit={handleSubmit}
                style={
                  {
                    '--form-label-width': props.labelWidth || '120px',
                  } as JSX.CSSProperties
                }
              >
                <div class='form-fields'>
                  <For each={props.fields}>
                    {(field) => (
                      <Show
                        when={
                          field.type !== 'checkbox' && field.type !== 'radio'
                        }
                        fallback={
                          <div class='form-row form-row-checkbox'>
                            {renderField(field)}
                            <Show when={errors()[field.id]}>
                              <div id={`${field.id}-error`} class='form-error'>
                                {errors()[field.id]}
                              </div>
                            </Show>
                          </div>
                        }
                      >
                        <div class='form-row'>
                          <label class='form-label' for={field.id}>
                            {field.label}
                            {field.required && (
                              <span class='form-required'>*</span>
                            )}
                          </label>
                          <div class='form-input-container'>
                            {renderField(field)}
                            <Show when={errors()[field.id]}>
                              <div id={`${field.id}-error`} class='form-error'>
                                {errors()[field.id]}
                              </div>
                            </Show>
                          </div>
                        </div>
                      </Show>
                    )}
                  </For>
                </div>

                <div class='form-buttons'>
                  <For
                    each={
                      props.buttons || [
                        {
                          label: 'OK',
                          type: 'submit' as const,
                          variant: 'default' as const,
                        },
                        {
                          label: 'Cancel',
                          type: 'button' as const,
                          onClick: props.onClose,
                        },
                      ]
                    }
                  >
                    {(button) => (
                      <Button
                        variant={button.variant}
                        disabled={button.disabled}
                        onClick={() => handleButtonClick(button)}
                        type={button.type === 'submit' ? 'submit' : 'button'}
                      >
                        {button.label}
                      </Button>
                    )}
                  </For>
                </div>
              </form>
            </Window>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
