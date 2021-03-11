using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
   public interface IPrime
    {
        Boolean isPrime(int prime);
        List<int> countPrime(int from, int to);
    }
}
