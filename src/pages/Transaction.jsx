import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useAuth } from '@clerk/react';
import { getUserTransactions } from '../services/PaymentService';
import toast from 'react-hot-toast';
import { AlertCircle, Loader2, Receipt } from 'lucide-react';

const Transaction = () => {

  const [transactions, setTransactions] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(null);
  const {getToken} = useAuth();

  useEffect(()=>{
    const fetchTransactions = async()=>{

      try{
        setLoading(true);
        const token = await getToken();
        const response = await getUserTransactions(token);

        setTransactions(response.data);
        setError(null);
        toast.success("Transactions fetched successfully.");
      }
      catch(error){
        console.log("Error fetching transactions:" + error);
        setError("Failed to load your transaction history. Please try again later.");
        toast.error("Error fetching transactions");
      }
      finally{
        setLoading(false);
      }
    }

    fetchTransactions();

  },[getToken])


  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatAmount = (amountInPaisa)=>{
    return `₹${(amountInPaisa/100).toFixed(2)}`;
  }
  return (
    <DashboardLayout activeMenu={"Transactions"}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Receipt className='text-blue-600'/>
          <h1 className='text-2xl font-bold'>Transaction History</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 ">
            <AlertCircle size={20}/>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className='animate-spin mr-2' size={24}/>
            <span>Loading transactions...</span>
          </div>
        ):transactions.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">

            <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No Transactions Yet
            </h3>
            
            <p className="text-gray-500">
              You haven't made any credit purchases yet. Visit the Subscription
              page to buy credits.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto ">
              
              <table className='min-w-full bg-white rounded-lg shadow overflow-hidden'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Plan</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Credits Added</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Payment ID</th>
                  </tr>
                </thead>

                
                <tbody className='divide-y divide-gray-200'>
                  {transactions.map((transaction)=>(
                    <tr key={transaction.orderId} className="hover:bg-gray-50">
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatDate(transaction.paymentDate)}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {transaction.planId} Plan
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatAmount(transaction.amount)} 
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {transaction.credits} 
                      </td>
                    
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {transaction.paymentId ?
                          transaction.paymentId.substring(0,12)+ "..."
                          : "N/A"  
                        } 
                      </td>



                    </tr>
                  ))}

                </tbody>
              </table>
          </div>

        )}

      </div>
    </DashboardLayout>
  )
}

export default Transaction
