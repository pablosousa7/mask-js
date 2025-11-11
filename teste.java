// ----------------------------------------------
// WORD COUNT MODEL 1
// ----------------------------------------------
import java.util.*;

public class Test {
    public static void main(String[] args) {
        String texto = "Java é ótimo. Java é poderoso! Ótimo, não?";

        // Normaliza o texto: tudo minúsculo
        texto = texto.toLowerCase();

        // Remove pontuação manualmente
        StringBuilder limpo = new StringBuilder();
        for (char c : texto.toCharArray()) {
            if (Character.isLetter(c) || c == ' ') {
                limpo.append(c);
            }
        }

        // Separa palavras
        String[] palavras = limpo.toString().split(" ");

        // Conta ocorrências
        Map<String, Integer> contagem = new HashMap<>();
        for (String palavra : palavras) {
            if (!palavra.isEmpty()) {
                contagem.put(palavra, contagem.getOrDefault(palavra, 0) + 1);
            }
        }

        // Exibe ordenado por chave
        contagem.entrySet() // conjunto de pares (palavra, contagem)
        .stream() // transforma em fluxo
        .sorted(Map.Entry.comparingByKey()) // ordena por chave ou valor
        .forEach(entry -> System.out.println(entry.getKey() + " -> " + entry.getValue()));

    }
}

// ----------------WORD COUNT MODEL 2-------------------
import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String entrada = scanner.nextLine();

   
        entrada = entrada.toLowerCase()
                         .replace(",", " ")
                         .replace(".", " ")
                         .replace(";", " ")
                         .replace("\t", " ")
                         .replace("\n", " ");


        String[] palavras = entrada.trim().split("\\s+");


        int contador = 0;
        for (String palavra : palavras) {
            if (!palavra.isEmpty()) {
                contador++;
            }
        }

        System.out.println(contador);
    }
}

//----Counting Words With a Given Prefix-----------------
public static int countPrefixes(String[] words, String pref) {
    int count = 0;
    for (String word : words) {
        if (word.startsWith(pref)) {
            count++;
        }
    }
    return count;
}


// --processamento assíncrono de um arquivo CSV em Java--

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CsvAsyncProcessor {
    private static final int THREAD_POOL_SIZE = 5;
  
    public static void main(String[] args) {
        String caminhoCsv = "dados.csv"; // substitua pelo caminho real
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

        try (BufferedReader reader = new BufferedReader(new FileReader(caminhoCsv))) {
            String linha;
            while ((linha = reader.readLine()) != null) {
                String linhaFinal = linha; // necessário para usar dentro da lambda
                executor.submit(() -> processarLinha(linhaFinal));
            }
        } catch (IOException e) {
            System.err.println("Erro ao ler o CSV: " + e.getMessage());
        }
        executor.shutdown(); // encerra o executor após submissão
    }

    private static void processarLinha(String linha) {
        // Simula processamento (ex: salvar no banco, transformar dados)
        System.out.println("Processando: " + linha);
        try {
            Thread.sleep(100); // simula tempo de processamento
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
// ----------------------------------------------
// Spring Boot WebFlux
// ----------------------------------------------
import reactor.core.publisher.Flux;
import java.nio.file.*;
import java.util.stream.Stream;

public class CsvReactiveProcessor {

    public static void main(String[] args) throws Exception {
        Path caminho = Paths.get("dados.csv");

        try (Stream<String> linhas = Files.lines(caminho)) {
            Flux.fromStream(linhas)
                .parallel()
                .runOn(reactor.core.scheduler.Schedulers.parallel())
                .doOnNext(CsvReactiveProcessor::processarLinha)
                .sequential()
                .blockLast(); // espera terminar
        }
    }

    private static void processarLinha(String linha) {
        System.out.println("Reativamente processando: " + linha);
    }
}

// ----------------------------------------------
// Remove Duplicates from Sorted Array
// ----------------------------------------------
// return Arrays.stream(nums).distinct().toArray(); java moderno
int k = 0;
for (int i = 0; i < nums.length; i++){ if (i == 0 || nums[i] != nums[i - 1]) nums[k++] = nums[i];}
return k;



//----- MaxWordsInSentence --------

    public class MaxWordsInSentence {
    public static int mostWordsFound(String[] sentences) {
        int max = 0;
        for (String sentence : sentences) {
            int count = sentence.split(" ").length;
            if (count > max) {
                max = count;
            }
        }
        return max;
    }

