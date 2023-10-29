import CreateApiKey from "@/components/api-key/add-api-key";

function ApiKey() {
  return (
    <>
      <h2 className="text-2xl font-medium">API key Setting</h2>
      <p className="opacity-75">
        Configure API keys to access data from outside
      </p>
      <section className="mt-10 space-y-5">
        <CreateApiKey />
      </section>
    </>
  );
}

export default ApiKey;
