import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import Modal from "~/components/modal";

export interface quotes {
  quotes: string[][];
  openModal: boolean;
}

export const ctx = createContextId<quotes>("qwik-app");

export default component$(() => {
  const state = useStore<quotes>({
    quotes: [],
    openModal: false,
  });

  useContextProvider(ctx, state);

  return (
    <>
      {state.openModal && <Modal />}
      <header>
        <i
          onClick$={() => {
            state.openModal = !state.openModal;
          }}
          class="fa-solid fa-plus cursor-pointer"
        ></i>
      </header>
      <main class="mx-auto mt-5 flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-2">
        <Slot />
      </main>
      <footer></footer>
    </>
  );
});
