import Link from 'next/link';

export default function Home() {
  return (
    <Link

      href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/meeting`}
    >
      authorize
    </Link>
  );
}
