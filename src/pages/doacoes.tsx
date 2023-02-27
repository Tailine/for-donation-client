import { DonationCard } from 'components/DonationCard'
import { DonationLayout } from 'templates/DonationLayout'
import { makeDonationService } from 'factories/makeDonationService'
import { InferGetStaticPropsType } from 'next'

export default function Donations({
  donations
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const donationList = donations.map((donation) => <DonationCard />)
  return (
    <DonationLayout shouldDisplayAddDonation={false} title="Doações">
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

export async function getServerSideProps() {
  try {
    const donations = await makeDonationService().getDonations()
    return {
      props: {
        donations
      }
    }
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      donations: []
    }
  }
}
