-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "gradient" TEXT NOT NULL,
    "bgGradient" TEXT NOT NULL,
    "borderColor" TEXT NOT NULL,
    "features" TEXT[],
    "badge" TEXT NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "instant" BOOLEAN NOT NULL DEFAULT false,
    "pricingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "messaging" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_pricingId_key" ON "Package"("pricingId");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
