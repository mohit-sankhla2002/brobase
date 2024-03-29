import { permanentRedirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth'
export default async function Home() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return permanentRedirect("/sign-in")
  }
  else {
    return permanentRedirect("/chat");
  }
}