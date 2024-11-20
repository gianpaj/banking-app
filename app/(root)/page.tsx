import RightSidebar from '@/components/RightSidebar';
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import getLoggedInUser from '@/lib/actions/user.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser() //(await getLoggedInUser()) as User | null; to ensure User
  const accounts = await getAccounts({ 
    userId: loggedIn.$id
    })

  if(!accounts) return;

const accountsData = accounts?.data;
const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

const account = await getAccount({ appwriteItemId })
console.log({
  accountsData,
  account
})
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
         <HeaderBox 
         type="greeting"
         title="Welcome"
         user={loggedIn?.firstName || 'Guest'}
         subtext="Access and manage your account and transactions efficiently."
         />

        <TotalBalanceBox 
        accounts={accountsData}
        totalBanks={accounts?.totalBanks}
        totalCurrentBalance={accounts?.totalCurrentBalance}
        />

        </header>


      </div>
      
      {loggedIn ? (
  <RightSidebar 
    user={loggedIn}
    transactions={accounts?.transactions}
    banks={accountsData?.slice(0, 2)}
  />
) : (
  <p>Loading user information...</p>
)}
</section>
);
};
export default Home