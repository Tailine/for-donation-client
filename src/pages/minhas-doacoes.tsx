import { DonationCard } from 'components/DonationCard'
import { DonationLayout } from 'templates/DonationLayout'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { verifyAuth } from 'utils/verifyAuth'

export default function MyDonations({
  userId
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DonationLayout
      userId={userId}
      shouldDisplayAddDonation
      title="minhas doações"
    >
      <>
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
        <DonationCard
          location={{ city: 'Salvador', state: 'BA' }}
          category="eletrodoméstico"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          corrupti repellendus veritatis officia, nam dolorum saepe. Corrupti"
          id=""
          title="Geladeira"
          image={{
            url: '/test.png',
            alt: ''
          }}
        />
      </>
    </DonationLayout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return verifyAuth(ctx)
}
