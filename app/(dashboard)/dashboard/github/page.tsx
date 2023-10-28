import CreateRepo from "@/components/github-setting/create-repo";
import ImportRepo from "@/components/github-setting/import-repo";

function Github() {
  return (
    <>
      <h2 className="text-2xl font-medium">Github Setting</h2>
      <p className="opacity-75">Configure data source</p>
      <section className="mt-10 space-y-5">
        <CreateRepo />
        <ImportRepo />
      </section>
    </>
  );
}

export default Github;
