using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
    public class Prime : IPrime
    {
        public List<string> countPrime(int from, int to)
        {
            List<string> myList = new List<string>() {
                "one",
                "two",
                "three",
                };
            return myList;
        }

        public bool isPrime(int prime)
        {
            return false;
        }
    }
}
