using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
   public interface IPrime
    {
        Boolean isPrime(string prime);
        List<string> countPrime(string from, string to);
    }
}
