// --------------------------------------------------------
// processamento assíncrono de um arquivo CSV em Java
// --------------------------------------------------------
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


