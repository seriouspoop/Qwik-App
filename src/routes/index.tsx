import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ctx } from "./layout";
import type { quotes } from "./layout";

export default component$(() => {
  const displayIndex = useSignal(0);
  const data = useContext<quotes>(ctx);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      console.log("rotated");
      if (displayIndex.value < data.quotes.length - 1) {
        displayIndex.value++;
      } else {
        displayIndex.value = 0;
      }
    }, 10000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <>
      {data.quotes.length > 0 ? (
        <>
          <h1 class="text-center text-3xl font-semibold">
            "{data.quotes[displayIndex.value][0]}"
          </h1>
          <p class="text-center text-sm text-slate-300">
            <i>- {data.quotes[displayIndex.value][1]}</i>
          </p>
        </>
      ) : (
        <>
          <p class="text-center text-4xl font-semibold">Welcome to Quotes</p>
          <p
            class="mt-5 cursor-pointer rounded border border-solid border-white bg-white px-4 py-4 text-slate-900 duration-200 hover:bg-slate-300"
            onClick$={() => {
              data.openModal = true;
            }}
          >
            Add your Quote
          </p>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "qwik-app",
  meta: [
    {
      name: "description",
      content: "Quotes app in qwik.",
    },
  ],
};
