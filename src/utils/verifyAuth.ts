import { GetServerSidePropsContext } from 'next'

export function verifyAuth({ req }: GetServerSidePropsContext) {
  if (!req.cookies['user_id'] || !req.cookies['access_token']) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      userId: req.cookies['user_id']
    }
  }
}
