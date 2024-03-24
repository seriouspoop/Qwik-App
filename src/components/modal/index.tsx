import { component$, useContext, useSignal } from "@builder.io/qwik";
import { ctx } from "~/routes/layout";
import type { quotes } from "~/routes/layout";

export default component$(() => {
  const quote = useSignal("");
  const author = useSignal("");
  const data = useContext<quotes>(ctx);

  return (
    <div class="fixed left-0 top-0 flex h-screen w-screen flex-col gap-2 bg-slate-900 p-4">
      <p class="text-center text-2xl font-semibold">Add an quote</p>
      <input
        placeholder="Enter quote"
        bind:value={quote}
        class="rounded border border-sky-800 bg-transparent p-2 text-sm outline-none duration-200 focus:border-sky-400 focus:outline-none sm:text-base"
      />
      <input
        bind:value={author}
        type="text"
        placeholder="Author"
        class="rounded border border-sky-800 bg-transparent p-2 text-sm outline-none duration-200 focus:border-sky-400 focus:outline-none sm:text-base"
      />
      <button
        class="ml-auto rounded bg-sky-400 px-4 py-2 text-sm duration-200 hover:bg-sky-600"
        onClick$={() => {
          if (!author.value || !quote.value) {
            return;
          }
          data.quotes = [...data.quotes, [quote.value, author.value]];
          data.openModal = false;
        }}
      >
        Save
      </button>
      <hr />
      <div class="flex flex-col gap-1">
        {data.quotes.map((quoteArr, index) => {
          return (
            <div
              class="flex items-center gap-2 rounded bg-[black] p-2 text-sm"
              key={index}
            >
              <div class="flex flex-1 flex-col">
                <p>{quoteArr[0]}</p>
                <p class="text-xs text-slate-300">
                  <i>-{quoteArr[1]}</i>
                </p>
              </div>
              <i
                onClick$={() => {
                  data.quotes = data.quotes.filter(
                    (elem, elemIndex) => elemIndex != index,
                  );
                }}
                class="fa-solid fa-minus cursor-pointer duration-200 hover:scale-125"
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
});
