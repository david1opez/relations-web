import Icons from './Icons.json';

// TYPES
import { IconProps, IconType } from './Icon.interface';

export default function Icon({ size, color, name, className, style, onClick }: IconProps) {
    const Icon: IconType = Icons[name] as IconType;

    if (!Icon) {
        console.error(`El icono "${name}" no se encontró en Icons.json`);
        return null; // Previene que se intente renderizar algo que no existe
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={typeof size === 'object' ? size.width : size}
            height={typeof size === 'object' ? size.height : size}
            viewBox={Icon.viewbox}
            className={className}
            onClick={onClick && onClick}
            style={style && style}
        >
            {
                Icon.paths.map((path, index) => (
                    <path
                        key={index}
                        d={path.d}
                        fill={path.fill ? color : 'none'}
                        stroke={color ? color : path.stroke}
                        strokeWidth={path.strokeWidth}
                        strokeLinecap={path.strokeLinecap}
                        strokeLinejoin={path.strokeLinejoin}
                    />
                ))
            }
        </svg>
    );
}