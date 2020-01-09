defmodule Tri do
 def test(array,tryNumber)do
    measure(fn -> sortAllArray(array,[],tryNumber) end)
  end

  def measure(function) do
    function
    |> :timer.tc
    |> elem(0)
    |> Kernel./(1_000)
  end

  def runSort(array,tryNumber)do
    sortAllArray(array,[],tryNumber)
  end

  def sortAllArray(unsortedArray,sortedArray,n)do
    cond do
      n == 0 -> sortedArray
      true -> n = n - 1
              sortedArray = sortedArray ++ [tri_fusion(Enum.at(unsortedArray,n),[])]
              sortAllArray(unsortedArray,sortedArray,n)
    end
  end

  def arrayOfArray(array,n)do
  cond do
      n == 0 -> array
      true -> n = n - 1
              array = array ++ [randomArray([],1000)]
              arrayOfArray(array,n)
    end
  end

  def randomArray(array,l)do
    cond do
      l == 0 -> array
      true -> l = l - 1
              array = array ++ [Enum.random(0..100)]
              randomArray(array,l)
    end
  end

   def divise(l, acc1 \\ [], acc2 \\ []) do
                  cond do 
                    l == [] -> { acc1, acc2 }
                    (tl l) == [] -> { [hd l] ++ acc1 , acc2 }
                    true ->
                      divise(tl(tl l), ([hd l] ++ acc1), ([hd(tl l)] ++ acc2))
                  end
                end
                # @name fusionne
                # Fonction fusionnant deux liste trié en une unique liste triée
                # @param l1 list première liste triée
                # @param l2 list deuxième liste triée
                # @param acc list liste de stockage
                # @param comp function fonction de comparaison
                # @return l1 fusionné à l2 et trié.
                def fusionne(l1,l2,acc \\ []) do
                  cond do
                    l1 == [] -> acc ++ l2
                    l2 == [] -> acc ++ l1
                    true -> 
                      (hd l1) < (hd l2) &&
                      fusionne((tl l1), l2, (acc ++ [hd l1])) ||
                      fusionne(l1, (tl l2), (acc ++ [hd l2]))
                  end
                end
                # @name tri_fusion
                # Trie la liste passé en argument
                # @param l list liste à triée
                # @param acc list list de stockage
                # @param comp function fonction de comparaison à utiliser
                # @return liste l triée
                def tri_fusion(l,acc \\ []) do
                  cond do
                    l == [] -> acc
                    (tl l)==[] -> l
                    true -> 
                      tuple = divise l
                      l1 = elem(tuple, 0)
                      l2 = elem(tuple, 1)
                      fusionne (tri_fusion l1), (tri_fusion l2), []
                  end
                end
                # @name croissant
                # Opérateur de comparaison pour trier les entier par ordres croissant
                # @param a int entier a
                # @param b int entier b
                # @return true si a < b, false sinon
                def croissant(a,b) do
                  a < b
                end

                def ex_trifusion_cint(l) do
                  tri_fusion(l)
                end

end
  
IO.puts(Tri.test(Tri.arrayOfArray([],1000),1000)/1000)

# IO.puts(Tri.measure(fn -> Tri.arrayOfArray([],1000) end))

