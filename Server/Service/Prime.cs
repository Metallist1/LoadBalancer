using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
    public class Prime : IPrime
    {
        public List<string> countPrime(string from, string to)
        {
            List<string> myList = new List<string>() {
                "one",
                "two",
                "three",
                };
            return myList;
        }

        public bool isPrime(string prime)
        {
            return false;
        }
    }
}
