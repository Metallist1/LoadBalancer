using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
   public interface IPrime
    {
        Boolean isPrime(int prime);
        List<string> countPrime(int from, int to);
    }
}
