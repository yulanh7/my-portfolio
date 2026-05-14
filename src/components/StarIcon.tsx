interface Props {
  size: number;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StarIcon({
  size,
  color,
  className = "",
  style,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill={color}
      className={className}
      style={style}
    >
      <path d="M20 0 C20 0 19 13 16 16 C13 19 0 20 0 20 C0 20 13 21 16 24 C19 27 20 40 20 40 C20 40 21 27 24 24 C27 21 40 20 40 20 C40 20 27 19 24 16 C21 13 20 0 20 0 Z" />{" "}
    </svg>
  );
}
