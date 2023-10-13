"use client";

import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const CreateMenuNav = () => {
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);
  const onSubmit = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      <Menu as="div" className="w-full flexBetween px-4 py-2">
        <div>
          <Menu.Button
            type="button"
            onClick={onDismiss}
            className="inline-flex w-full justify-center rounded-3xl bg-black bg-opacity-20 px-4 py-2 text-m font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Cancel
          </Menu.Button>
        </div>

        <div>
          <Menu.Button
            type="button"
            onClick={onSubmit}
            className="inline-flex w-full justify-center rounded-3xl bg-black bg-opacity-20 px-4 py-2 text-m font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Submit
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
};

export default CreateMenuNav;
