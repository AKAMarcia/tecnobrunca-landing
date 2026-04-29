import { useLanguage } from '../LanguageContext';
import { TextRoll } from './ui/text-roll';

type DynamicTextProps = {
  translationKey: string;
  className?: string;
  as?: React.ElementType;
};

export const DynamicText = ({ translationKey, className, as: Component = 'span' }: DynamicTextProps) => {
  const { getMetadata } = useLanguage();
  const { value, effect } = getMetadata(translationKey);

  if (effect === 'textroll') {
    return (
      <TextRoll className={className}>
        {value}
      </TextRoll>
    );
  }

  // Si es un arreglo, el componente padre probablemente lo maneje, 
  // pero por si acaso lo renderizamos como span.
  return <Component className={className}>{value}</Component>;
};
