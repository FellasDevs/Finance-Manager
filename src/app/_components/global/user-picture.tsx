export function UserPicture({
  picture,
  alt,
}: {
  picture: string;
  alt: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={picture}
      alt={alt}
      width={35}
      height={35}
      className="rounded-full"
    />
  );
}
