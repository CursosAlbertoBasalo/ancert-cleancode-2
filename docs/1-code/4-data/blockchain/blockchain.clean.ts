/**
 * Blockchain Implementation
 *
 * Implements a simplified blockchain that stores data in blocks.
 * Each block is linked to the previous one through a hash.
 */

// Value Objects to encapsulate primitives with domain meaning

class BlockIndex {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error("Block index cannot be negative");
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public next(): BlockIndex {
    return new BlockIndex(this.value + 1);
  }

  public isGenesis(): boolean {
    return this.value === 0;
  }
}

class BlockHash {
  private readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error("Hash value cannot be empty");
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static createGenesisHash(): BlockHash {
    return new BlockHash("0");
  }

  public static calculateFrom(
    index: BlockIndex,
    data: BlockData,
    previousHash: BlockHash,
  ): BlockHash {
    const hashContent =
      index.getValue().toString() + data.getLength().toString() + previousHash.getValue();

    return new BlockHash(hashContent);
  }
}

class BlockData {
  private readonly content: string;

  constructor(content: string) {
    this.content = content || "";
  }

  public getContent(): string {
    return this.content;
  }

  public getLength(): number {
    return this.content.length;
  }

  public static createEmpty(): BlockData {
    return new BlockData("");
  }
}

class Timestamp {
  private readonly value: Date;

  constructor(date?: Date) {
    this.value = date || new Date();
  }

  public getValue(): Date {
    return this.value;
  }

  public static now(): Timestamp {
    return new Timestamp();
  }
}

// Entity: Block in the blockchain

class Block {
  private readonly index: BlockIndex;
  private readonly timestamp: Timestamp;
  private readonly data: BlockData;
  private readonly previousHash: BlockHash;
  private readonly hash: BlockHash;

  private constructor(
    index: BlockIndex,
    timestamp: Timestamp,
    data: BlockData,
    previousHash: BlockHash,
    hash: BlockHash,
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = hash;
  }

  public getIndex(): BlockIndex {
    return this.index;
  }

  public getData(): BlockData {
    return this.data;
  }

  public getHash(): BlockHash {
    return this.hash;
  }

  public getPreviousHash(): BlockHash {
    return this.previousHash;
  }

  public getTimestamp(): Timestamp {
    return this.timestamp;
  }

  // Domain logic methods
  public isValid(previousBlock: Block): boolean {
    const hasCorrectIndex = this.index.getValue() === previousBlock.getIndex().next().getValue();
    const isLinkedToPrevious = this.previousHash.getValue() === previousBlock.getHash().getValue();
    const hasValidHash = this.recalculateHash().getValue() === this.hash.getValue();

    return hasCorrectIndex && isLinkedToPrevious && hasValidHash;
  }

  public recalculateHash(): BlockHash {
    return BlockHash.calculateFrom(this.index, this.data, this.previousHash);
  }

  // Factory methods
  public static createGenesisBlock(): Block {
    const genesisIndex = new BlockIndex(0);
    const genesisTimestamp = Timestamp.now();
    const genesisData = BlockData.createEmpty();
    const genesisPreviousHash = BlockHash.createGenesisHash();

    const genesisHash = BlockHash.calculateFrom(genesisIndex, genesisData, genesisPreviousHash);

    return new Block(genesisIndex, genesisTimestamp, genesisData, genesisPreviousHash, genesisHash);
  }

  public static createBlock(previousBlock: Block, data: BlockData): Block {
    const newIndex = previousBlock.getIndex().next();
    const newTimestamp = Timestamp.now();
    const previousHash = previousBlock.getHash();

    const newHash = BlockHash.calculateFrom(newIndex, data, previousHash);

    return new Block(newIndex, newTimestamp, data, previousHash, newHash);
  }
}

// Aggregate: The Blockchain itself

class Blockchain {
  private readonly chain: Block[];
  private timestamp: Timestamp;

  constructor() {
    this.timestamp = Timestamp.now();
    this.chain = [Block.createGenesisBlock()];
  }

  public getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public getChain(): Block[] {
    return [...this.chain];
  }

  public getTimestamp(): Timestamp {
    return this.timestamp;
  }

  // Domain operations
  public addBlock(data: string): void {
    const dataObject = new BlockData(data);
    const lastBlock = this.getLastBlock();
    const newBlock = Block.createBlock(lastBlock, dataObject);

    this.chain.push(newBlock);
    this.timestamp = Timestamp.now();
  }

  public isValid(): boolean {
    // Genesis block validation is special
    if (this.chain.length === 1) {
      const genesisBlock = this.chain[0];
      return genesisBlock.getIndex().isGenesis();
    }

    // Validate the rest of the chain
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.isValid(previousBlock)) {
        return false;
      }
    }

    return true;
  }
}

// Example usage:
const blockchain = new Blockchain();
blockchain.addBlock("First transaction data");
blockchain.addBlock("Second transaction data");
console.log("Is blockchain valid?", blockchain.isValid());
